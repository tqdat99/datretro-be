import { ICrudService } from "./../interfaces/ICrudService";
import { Logger } from "./../logger/logger";
import { Service, Inject } from "typedi";
import Board from "./../models/board";

@Service()
export default class BoardService implements ICrudService {
  constructor(private logger: Logger) { }

  public async get(queryOptions?: {}): Promise<any[]> {
    const boards = await Board.find(queryOptions).exec();
    return boards;
  }

  public async getById(id: string): Promise<any> {
    const board = await Board.findById(id).exec();
    return board;
  }

  public async create(data: [] | {}): Promise<any> {
    const doc = new Board({ title: data['title'], user: data['user'] });
    const board = await Board.create(doc);
    return board;
  }

  public async update(id: string, data: {}): Promise<any> {
    const board = await Board.findByIdAndUpdate(id, data);
    return await board.save();
  }

  public async delete(id: string): Promise<any> {
    const board = await Board.findByIdAndDelete(id);
    return board;
  }
}
