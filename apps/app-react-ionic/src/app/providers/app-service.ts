import { RxStore } from '@bsmp/rx';
import { FirebaseService } from '@bsmp/api';
import { ConfigService, Storage } from '@bsmp/core';
import { environment } from '../../environments/environment';
import { ability } from '../hooks/use-ability-context';

// const apiUrl = "https://bsmp-workspace.firebaseapp.com/apps/app-react-ionic/assets/";
const apiUrl = '';
const apiUrlDev = '';
const configUrl = 'config.json';
const firebaseService: FirebaseService = FirebaseService.instance;

export class AppState {
  apiUrl?;
  apiUrlDev?;
  // authData?: any;
  authType?: string;
  // authType?: string = 'firebase:email/password';
  cache?: boolean;
  // fixme: override with config.json
  config?: any;
  configUrl?: string;
  roles = {
    ANONYMOUS: [
      {
        actions: ['read', 'login'],
        subject: ['all'],
      }
    ],
    AUTHENTICATED: [
      {
        actions: ['read', 'update', 'logout'],
        subject: ['all'],
      }
    ],
    DEVELOPER: [
      {
        actions: ['create', 'read', 'update', 'delete', 'debug', 'logout','autoLogin'],
        subject: ['all'],
      }
    ]
  };
  user?: any;
  authenticated? = false;
  initialized? = false;
  redirect?: string;
  production? = environment.production;
  counter? = 0;
}

class AppService extends RxStore<AppState> {
  public config: ConfigService = ConfigService.instance;
  public ability = ability;

  constructor() {
    super(new AppState());
    this.initApp();
  }

  public async initApp() {
    if (environment.production) await this.config.fetch(apiUrl + configUrl);
    if (!environment.production) {
      await import(
        '../../' + apiUrlDev + configUrl
      ).then((configObject: unknown) => this.config.add(configObject, true));
    }
    await firebaseService.init();
    this.initRoles();
    this.initDevEnvironment();
    this.getLocalAuthData();
    this.setState({
      ...this.state,
      ...{ config: this.config.get(), initialized: true },
    });
  }

  private initRoles = () => {
    if (this.config.get('roles')) {
      const roles = {...this.state.roles, ...this.config.get('roles')}
      this.setState({...this.state, ...{roles}})
    }
    ability.update(this.state.roles.ANONYMOUS);
  };

  public async getLocalAuthData(): Promise<any> {
    const authData = Storage.getObject('auth:' + this.config.get('appId'), true);
    const userData = Storage.getObject('user:' + this.config.get('appId'), true);
    return { authData, userData };
  }

  private initDevEnvironment = () => {
    if (environment.production === false && this.config.get('dev')) {
      ability.update(this.state.roles.DEVELOPER);
    }
  }
}

export const appService = new AppService();
// export const AppServiceContext = React.createContext(appService);
