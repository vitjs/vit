export {
  Link,
  NavLink,
  Prompt,
  Redirect,
  Route,
  Router,
  StaticRouter,
  MemoryRouter,
  Switch,
  matchPath,
  withRouter,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

export { createBrowserHistory, createHashHistory, createMemoryHistory } from 'history-with-query';
export type {
  MemoryHistory,
  History,
  BrowserHistoryBuildOptions,
  HashHistoryBuildOptions,
  MemoryHistoryBuildOptions,
} from 'history-with-query';

export { default as renderRoutes } from './renderRoutes';
export { default as dynamic } from './dynamic';

// @ts-ignore
export * from '@@/exports';
