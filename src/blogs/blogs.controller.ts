import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { BlogsService } from './blogs.service';
import { BlogDTO } from './dto/blog.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AwsService } from './aws.service';

@Controller('blogs')
export class BlogsController {
  constructor(
    private blogsService: BlogsService,
    private awsService: AwsService,
  ) {}

  @ApiOperation({ summary: '모든 블로그 가져오기' })
  @Get()
  async getAllBlog() {
    return await this.blogsService.getAllBlogs();
  }
  //   getBlog(@CurrentBlog()){}
  @ApiOperation({ summary: '특정 블로그 불러오기' })
  @Get(':id')
  async getBlog(@Param('id') id: string) {
    return await this.blogsService.getBlog(id);
  }

  @ApiOperation({ summary: '블로그 글쓰기' })
  @Post()
  async blogPost(@Body() body: BlogDTO) {
    return await this.blogsService.blogPost(body);
  }

  @ApiOperation({ summary: '특정 블로그 수정' })
  @Patch(':id')
  async updateBlog(@Param('id') id: string, @Body() body: BlogDTO) {
    return await this.blogsService.updateBlog(id, body);
  }

  @ApiOperation({ summary: '특정 블로그 제거' })
  @Delete(':id')
  async deleteBlog(@Param('id') id: string) {
    return await this.blogsService.deleteBlog(id);
  }

  // @UseInterceptors(FileInterceptor('image', multerOptions('blogs')))
  // @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  // @ApiOperation({ summary: '이미지 업로드' })
  // @Post('upload')
  // @UseInterceptors(FilesInterceptor('images', 10, multerOptions('blogs')))
  // async updateImg(@UploadedFiles() files: Array<Express.Multer.File>) {
  //   // return 'img';
  //   // return { image: `http://localhost:8080/media/blogs/${files[0].filename}` };
  //   files.map((img) => {
  //     console.log(img.filename);
  //   });

  //   const result = [];
  //   await files.map((img) => {
  //     result.push(`http://localhost:8080/media/blogs/${img.filename}`);
  //   });
  //   console.log(result);

  //   return {
  //     images: result,
  //   };
  // }

  // @UseInterceptors(FileInterceptor('image', multerOptions('blogs')))
  @ApiOperation({ summary: '이미지 업로드' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async updateImg(@UploadedFile() file: Express.Multer.File) {
    // return 'img';
    // return { image: `http://localhost:8080/media/blogs/${files[0].filename}` };
    // return { image: `http://localhost:8080/media/blogs/${file.filename}` };

    const res = await this.awsService.uploadFileToS3('blog', file);
    return await this.awsService.getAwsS3FileUrl(res.key);
  }
}
