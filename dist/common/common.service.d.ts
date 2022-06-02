import { Model } from 'mongoose';
import { ConfigureDocument } from './schemas/configure.schema';
export declare class CommonService {
    private configureModel;
    constructor(configureModel: Model<ConfigureDocument>);
    getMinFee(): Promise<number>;
}
//# sourceMappingURL=common.service.d.ts.map