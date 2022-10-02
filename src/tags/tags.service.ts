import { BadRequestException, Body, Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TagEntity } from "./tags.entity";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly TagEntityRepository: Repository<TagEntity>
  ) {}

  async getTags() {
    try {
      const tags = await this.TagEntityRepository.find();
      return tags;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async postTags(names: string[]) {
    names.map(async (name) => {
      const IsTag = await this.TagEntityRepository.findOne({
        where: {
          name,
        },
      });

      !IsTag &&
        (await this.TagEntityRepository.save({
          name,
        }));
    });

    // return await this.TagEntityRepository.find();
  }

  async getTag(id) {
    try {
      const tags = await this.TagEntityRepository.find({
        where: { blog: id },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteAllTags(id: string) {
    return await this.TagEntityRepository.delete(id);
  }
}
