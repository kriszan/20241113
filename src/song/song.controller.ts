import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Response } from 'express';


@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) { }

  @Post()
  create(@Body() createSongDto: CreateSongDto, @Res() response: Response) {
    return this.songService.create(createSongDto).then(x => !x ? response.status(HttpStatus.NOT_FOUND).send({ message: "Server Error at findall" }) : response.status(HttpStatus.OK).send()).catch(err => { console.log(err); return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Server Error at findOne' }); });
  }

  @Get()
  findAll(@Res() response: Response) {
    return this.songService.findAll().then(x => !x ? response.status(HttpStatus.NOT_FOUND).send({ message: "Server Error at findall" }) : response.status(HttpStatus.OK).send(x)).catch(err => { console.log(err); return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Server Error at findAll' }); });
  }

  @Get('free')
  free(@Res() response: Response) {
    return this.songService.free().then(x => !x ? response.status(HttpStatus.NOT_FOUND).send({ message: "Server Error at free" }) : response.status(HttpStatus.OK).send(x)).catch(err => { console.log(err); return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Server Error at free' }); });
  }

  //TUDU
  @Get(':id')
  findOne(@Param('id') id: string, @Res() response: Response) {
    return this.songService.findOne(+id).then(x => !x ? response.status(HttpStatus.NOT_FOUND).send({ message: "Server Error at findall" }) : response.status(HttpStatus.OK).send(x)).catch(err => { console.log(err); return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Server Error at findOne' }); });
  }

  @Get()
  findTop(@Res() response: Response) {
    return this.songService.findTop().then(x => !x ? response.status(HttpStatus.NOT_FOUND).send({ message: "Server Error at findTop" }) : response.status(HttpStatus.OK).send(x)).catch(err => { console.log(err); return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Server Error at findTop' }); });
  }

  @Get()
  findPopularArtists(@Res() response: Response) {
    return this.songService.findPopularArtists().then(x => !x ? response.status(HttpStatus.NOT_FOUND).send({ message: "Server Error at findTop" }) : response.status(HttpStatus.OK).send(x)).catch(err => { console.log(err); return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Server Error at findTop' }); });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto, @Res() response: Response) {
    return this.songService.update(+id, updateSongDto).then(x => !x ? response.status(HttpStatus.NOT_FOUND).send({ message: "Server Error at update" }) : response.status(HttpStatus.OK).send()).catch(err => { console.log(err); return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Server Error at update' }); });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() response: Response) {
    return this.songService.remove(+id).then(x => !x ? response.status(HttpStatus.NOT_FOUND).send({ message: "Server Error at delete" }) : response.status(HttpStatus.OK).send()).catch(err => { console.log(err); return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Server Error at delete' }); });
  }
}
