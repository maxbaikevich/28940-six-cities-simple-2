import { inject, injectable } from 'inversify';
import {CommentServiceInterface} from './comment-service.interface.js';
import {Component} from '../../types/component.type.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.CommentModel) private readonly CommentModel: types.ModelType<CommentEntity>
  ){}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.CommentModel.create(dto);
    return comment.populate('userId');
  }

  public async deleteByOfferId(offerId: string): Promise<number | null> {
    const result = await this.CommentModel.deleteMany({ offerId });
    return result.deletedCount;
  }

  public findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.CommentModel
      .find({ offerId })
      .populate('userId');
  }
}
