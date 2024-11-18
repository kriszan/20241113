import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma.service';
import { response } from 'express';

@Injectable()
export class SongService {
  db: PrismaService;
  constructor(db: PrismaService) {
    this.db = db;
  }

  async create(createSongDto: CreateSongDto) {
    if (createSongDto.rating < 0 || createSongDto.rating > 5) {
      return response.status(500).send();
    }
    if (Object.values(createSongDto).every(x => x === null || x === undefined)) {
      return response.status(500).send();
    }
    
    return await this.db.song.create({ data: createSongDto })
  }

  async findAll() {
    return await this.db.song.findMany();
  }

  async findOne(id: number) {
    return await this.db.song.findFirst({ where: { id } })
  }

  async free() {
    return await this.db.song.findMany({ where: { price: 0 } })
  }

  async findTop() {
    return await this.db.song.findMany({ orderBy: {rating: 'desc'}, take: 10})
  }

  async findPopularArtists() {
    //return await this.db.song.groupBy({by: {author },_count: {lenght}})
    return 0;
  }

  async update(id: number, updateSongDto: UpdateSongDto) {
    return await this.db.song.update({
      where: { id: id },
      data: updateSongDto
    })
  }

  async remove(id: number) {
    return await this.db.song.delete({ where: { id } })
  }
}
