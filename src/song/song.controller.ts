import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Response } from 'express';


@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) { }

  @Post()
  create(@Body() createSongDto: CreateSongDto,@Res() response: Response) {
    return this.songService.create(createSongDto).then(x => response.statusCode !== 200? response.status(HttpStatus.BAD_REQUEST).send(response/*+"Server Error at findall"*/) : response.status(200).send(x));;
  }

  @Get()
  findAll(@Res() response: Response) {
    return this.songService.findAll().then(x => response.statusCode !== 200? response.status(HttpStatus.BAD_REQUEST).send(response/*+"Server Error at findall"*/): response.status(200).send(x));
  }

  @Get('free')
  free(@Res() response: Response) {
    return this.songService.free().then(x => response.statusCode !== 200? response.status(HttpStatus.BAD_REQUEST).send(response/*+"Server Error at findall"*/) : response.status(200).send(x));;
  }

  @Get(':id')
  findOne(@Param('id') id: string,@Res() response: Response) {
    return this.songService.findOne(+id).catch(err=> console.log(err)).then(x => response.statusCode !== 200? response.status(HttpStatus.BAD_REQUEST).send(response/*+"Server Error at findall"*/) : response.status(200).send(x));
  }

  @Get()
  findTop(@Res() response: Response) {
    return this.songService.findTop().then(x => response.statusCode !== 200? response.status(HttpStatus.BAD_REQUEST).send(response/*+"Server Error at findall"*/): response.status(200).send(x));
  }

  @Get()
  findPopularArtists(@Res() response: Response) {
    return this.songService.findPopularArtists().then(x => response.statusCode !== 200? response.status(HttpStatus.BAD_REQUEST).send(response/*+"Server Error at findall"*/): response.status(200).send(x));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto,@Res() response: Response) {
    return this.songService.update(+id, updateSongDto).then(x => response.statusCode !== 200? response.status(HttpStatus.BAD_REQUEST).send(response/*+"Server Error at findall"*/) : response.status(200).send(x));;
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Res() response: Response) {
    return this.songService.remove(+id).then(x => response.statusCode !== 200? response.status(HttpStatus.BAD_REQUEST).send(response/*+"Server Error at findall"*/) : response.status(200).send(x));;
  }
}
