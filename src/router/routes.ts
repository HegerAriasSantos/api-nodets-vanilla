import { bookController } from "../modules/book";
import { seedController } from "../modules/seed/controller";
import { IRoute } from "../modules/share";
const routes: IRoute = {
	book: bookController,
	seed: seedController,
};

export default routes;
