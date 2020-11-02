import { ICrudService } from "./../interfaces/ICrudService";
import { Logger } from "./../logger/logger";
import { Service, Inject } from "typedi";
import User from "./../models/user";

@Service()
export default class UserService implements ICrudService {
    constructor(private logger: Logger) { }

    public async get(queryOptions?: {}): Promise<any[]> {
        const cards = User.find(queryOptions);
        return await cards.exec();
    }

    public async getById(id: string): Promise<any> {
        const board = await User.findById(id).exec();
        return board;
    }

    public async create(data: [] | {}): Promise<any> {
        const board = await User.create(data);
        return board;
    }

    public async update(id: string, data: {}): Promise<any> {
        const board = await User.findByIdAndUpdate(id, data);
        return await board.save();
    }

    public async delete(id: string): Promise<any> {
        const board = await User.findByIdAndDelete(id);
        return board;
    }
}
