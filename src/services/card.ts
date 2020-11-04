import { ICrudService } from "./../interfaces/ICrudService";
import { Logger } from "./../logger/logger";
import { Service, Inject } from "typedi";
import Card from "./../models/card";

@Service()
export default class CardService implements ICrudService {
  constructor(private logger: Logger) { }

  public async get(queryOptions?: {}): Promise<any[]> {
    const card = Card.find(queryOptions);
    return await card.exec();
  }

  public async getById(id: string): Promise<any> {
    const card = Card.findById(id);
    return await card.exec();
  }

  public async getBycardId(cardId: string): Promise<any> {
    const card = Card.find({ cardId: cardId });
    return await card.exec();
  }

  public async create(data: [] | {}): Promise<any> {
    const doc = new Card({ boardId: data['boardId'], title: data['title'], content: data['content'], column: data['column'] });
    const card = await Card.create(doc);
    return card;
  }

  public async update(id: string, data: {}): Promise<any> {
    const card = await Card.findByIdAndUpdate(id, data);
    return await card.save();
  }

  public async delete(id: string): Promise<any> {
    const card = await Card.findByIdAndDelete(id);
    return card;
  }
}
