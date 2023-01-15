import { bookController } from "../modules/book";
import { IRoute } from "../modules/share";
const routes: IRoute = {
	book: bookController,
};

export default routes;
