import { type Application } from "express"
import { fetchAllBodies, fetchPlanetData } from "../controllers"

const routes = (app: Application) => {
    app.route('/api/planets').get(fetchAllBodies);
    app.route('/api/planet/:id').get(fetchPlanetData);
}

export default routes