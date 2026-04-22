import { randomUUID } from 'crypto';
import { existsSync, mkdirSync } from 'fs';
import { basename, extname, join } from 'path';
import { BadRequestException, Body, Controller, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';

const CV_UPLOAD_DIR = join(process.cwd(), 'uploads', 'cv');
const ALLOWED_CV_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]);
const { diskStorage } = require('multer') as {
  diskStorage: (options: {
    destination: (_request: unknown, file: CvUploadFile, callback: StringValueCallback) => void;
    filename: (_request: unknown, file: CvUploadFile, callback: StringValueCallback) => void;
  }) => any;
};

type StringValueCallback = (error: Error | null, value?: string) => void;
type CvUploadFile = {
  originalname: string;
  mimetype: string;
};
type StoredCvFile = CvUploadFile & {
  filename: string;
  path: string;
  size: number;
};

function ensureCvUploadDir() {
  if (!existsSync(CV_UPLOAD_DIR)) {
    mkdirSync(CV_UPLOAD_DIR, { recursive: true });
  }
}

function sanitizeFilePart(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('cvFile', {
      storage: diskStorage({
        destination: (_request, _file, callback) => {
          ensureCvUploadDir();
          callback(null, CV_UPLOAD_DIR);
        },
        filename: (_request, file, callback) => {
          const extension = extname(file.originalname).toLowerCase();
          const originalBaseName = basename(file.originalname, extension);
          const safeBaseName = sanitizeFilePart(originalBaseName) || 'cv';
          const fileName = `${safeBaseName}-${Date.now()}-${randomUUID()}${extension}`;
          callback(null, fileName);
        }
      }),
      fileFilter: (_request, file, callback) => {
        if (!ALLOWED_CV_MIME_TYPES.has(file.mimetype)) {
          callback(new BadRequestException('Chỉ hỗ trợ file CV dạng PDF, DOC hoặc DOCX.'), false);
          return;
        }

        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024
      }
    })
  )
  create(@Body() payload: CreateApplicationDto, @UploadedFile() cvFile?: StoredCvFile) {
    return this.applicationsService.create(payload, cvFile);
  }

  @Patch(':applicationId/status')
  updateStatus(@Param('applicationId') applicationId: string, @Body() payload: UpdateApplicationStatusDto) {
    return this.applicationsService.updateStatus(applicationId, payload);
  }
}
