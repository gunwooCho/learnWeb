import { Controller, Get, NotFoundException, Param, Render, UseGuards } from '@nestjs/common';

import JwtAuthGuard from '../modules/auth/providers/jwt/guard';
import BlogService from '../providers/blog.service';

@Controller('/blog')
@UseGuards(JwtAuthGuard)
export default class BlogController {
  constructor(private service: BlogService) { }

  @Render('blog')
  @Get()
  public index() {
    return { posts: this.service.all() };
  }

  @Render('blog/[slug]')
  @Get(':slug')
  public get(@Param('slug') slug: string) {
    const post = this.service.find(slug);

    if (post === null) {
      throw new NotFoundException();
    }

    return { post };
  }
}
