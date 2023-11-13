import {REPORTER, PRIORITY, STATUS } from "./app.constants";
import {Comment} from "./comment-dto";

export interface Bug {
    id: string;
    title: string;
    description: string;
    priority: number;
    reporter: REPORTER;
    status: STATUS;
    created: Date;
    comments: Comment[];
}