import { createStore } from "redux";

import { registrationReducer } from "./reducers/registrationReducer";

export const store = createStore(registrationReducer);
