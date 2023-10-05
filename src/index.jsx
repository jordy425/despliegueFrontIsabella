import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import routes from './config/routes/routes';

import './config/css/index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
   <RouterProvider router={routes} />
)