import { ICrudService } from "../interfaces/ICrudService";
import { Logger } from "../logger/logger";
import { Service, Inject } from "typedi";
import User from "../models/user";

@Service()
export default class UserService implements ICrudService {
    constructor(private logger: Logger) { }

    public async get(queryOptions?: {}): Promise<any[]> {
        const cards = User.find(queryOptions);
        return await cards.exec();
    }

    public async getById(id: string): Promise<any> {
        const user = await User.findById(id).exec();
        return user;
    }

    public async getByUsername(username: string): Promise<any> {
        const user = await User.find({ username: { $eq: username } }).exec();
        return user[0];
    }

    public async create(data: [] | {}): Promise<any> {
        const doc = new User({ username: data['username'], password: data['password'], displayName: data['displayName'] });
        const user = await User.create(doc);
        return user;
    }

    public async update(id: string, data: [] | {}): Promise<any> {
        console.log(id);
        console.log(data);
        const user = await User.findByIdAndUpdate(id, data);
        return await user.save();
    }

    public async delete(id: string): Promise<any> {
        const user = await User.findByIdAndDelete(id);
        return user;
    }
}
