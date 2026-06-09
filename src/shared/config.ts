import { createBrowserHistory } from "mobx-location-history";
import { ViewModelStoreBase } from "mobx-view-model";

export const rootElement = document.getElementById("root")!

export const history = createBrowserHistory();

export const vmStore = new ViewModelStoreBase({
  vmConfig: {
    observable: {
      viewModels: {
        useDecorators: false,
      },
      viewModelStores: {
        useDecorators: false,
      }
    }
  }
});