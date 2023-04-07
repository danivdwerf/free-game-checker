(function (React) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  var DefaultContext = {
    color: undefined,
    size: undefined,
    className: undefined,
    style: undefined,
    attr: undefined
  };
  var IconContext = React__default["default"].createContext && React__default["default"].createContext(DefaultContext);

  var __assign = window && window.__assign || function () {
    __assign = Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];

        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }

      return t;
    };

    return __assign.apply(this, arguments);
  };

  var __rest = window && window.__rest || function (s, e) {
    var t = {};

    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

    if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
  };

  function Tree2Element(tree) {
    return tree && tree.map(function (node, i) {
      return React__default["default"].createElement(node.tag, __assign({
        key: i
      }, node.attr), Tree2Element(node.child));
    });
  }

  function GenIcon(data) {
    return function (props) {
      return React__default["default"].createElement(IconBase, __assign({
        attr: __assign({}, data.attr)
      }, props), Tree2Element(data.child));
    };
  }
  function IconBase(props) {
    var elem = function (conf) {
      var attr = props.attr,
          size = props.size,
          title = props.title,
          svgProps = __rest(props, ["attr", "size", "title"]);

      var computedSize = size || conf.size || "1em";
      var className;
      if (conf.className) className = conf.className;
      if (props.className) className = (className ? className + ' ' : '') + props.className;
      return React__default["default"].createElement("svg", __assign({
        stroke: "currentColor",
        fill: "currentColor",
        strokeWidth: "0"
      }, conf.attr, attr, svgProps, {
        className: className,
        style: __assign(__assign({
          color: props.color || conf.color
        }, conf.style), props.style),
        height: computedSize,
        width: computedSize,
        xmlns: "http://www.w3.org/2000/svg"
      }), title && React__default["default"].createElement("title", null, title), props.children);
    };

    return IconContext !== undefined ? React__default["default"].createElement(IconContext.Consumer, null, function (conf) {
      return elem(conf);
    }) : elem(DefaultContext);
  }

  // THIS FILE IS AUTO GENERATED
  function FaMoneyBill (props) {
    return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 640 512"},"child":[{"tag":"path","attr":{"d":"M608 64H32C14.33 64 0 78.33 0 96v320c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V96c0-17.67-14.33-32-32-32zM48 400v-64c35.35 0 64 28.65 64 64H48zm0-224v-64h64c0 35.35-28.65 64-64 64zm272 176c-44.19 0-80-42.99-80-96 0-53.02 35.82-96 80-96s80 42.98 80 96c0 53.03-35.83 96-80 96zm272 48h-64c0-35.35 28.65-64 64-64v64zm0-224c-35.35 0-64-28.65-64-64h64v64z"}}]})(props);
  }

  let webpackCache = {};
  let hasWebpack5 = false;
  if (window.webpackJsonp && !window.webpackJsonp.deckyShimmed) {
      // Webpack 4, currently on stable
      const wpRequire = window.webpackJsonp.push([
          [],
          { get_require: (mod, _exports, wpRequire) => (mod.exports = wpRequire) },
          [['get_require']],
      ]);
      delete wpRequire.m.get_require;
      delete wpRequire.c.get_require;
      webpackCache = wpRequire.c;
  }
  else {
      // Webpack 5, currently on beta
      hasWebpack5 = true;
      const id = Math.random();
      let initReq;
      window.webpackChunksteamui.push([
          [id],
          {},
          (r) => {
              initReq = r;
          },
      ]);
      for (let i of Object.keys(initReq.m)) {
          webpackCache[i] = initReq(i);
      }
  }
  const allModules = hasWebpack5
      ? Object.values(webpackCache).filter((x) => x)
      : Object.keys(webpackCache)
          .map((x) => webpackCache[x].exports)
          .filter((x) => x);
  const findModule = (filter) => {
      for (const m of allModules) {
          if (m.default && filter(m.default))
              return m.default;
          if (filter(m))
              return m;
      }
  };
  const findModuleChild = (filter) => {
      for (const m of allModules) {
          for (const mod of [m.default, m]) {
              const filterRes = filter(mod);
              if (filterRes) {
                  return filterRes;
              }
              else {
                  continue;
              }
          }
      }
  };
  const CommonUIModule = allModules.find((m) => {
      if (typeof m !== 'object')
          return false;
      for (let prop in m) {
          if (m[prop]?.contextType?._currentValue && Object.keys(m).length > 60)
              return true;
      }
      return false;
  });
  findModule((m) => {
      if (typeof m !== 'object')
          return false;
      for (let prop in m) {
          if (m[prop]?.toString && /Spinner\)}\),.\.createElement\(\"path\",{d:\"M18 /.test(m[prop].toString()))
              return true;
      }
      return false;
  });
  allModules.find((m) => {
      if (typeof m !== 'object')
          return undefined;
      for (let prop in m) {
          if (m[prop]?.computeRootMatch)
              return true;
      }
      return false;
  });

  const ButtonItem = CommonUIModule.ButtonField ||
      Object.values(CommonUIModule).find((mod) => mod?.render?.toString()?.includes('"highlightOnFocus","childrenContainerWidth"') ||
          mod?.render?.toString()?.includes('childrenContainerWidth:"min"'));

  function sleep(ms) {
      return new Promise((res) => setTimeout(res, ms));
  }

  const [panelSection, mod] = findModuleChild((mod) => {
      for (let prop in mod) {
          if (mod[prop]?.toString()?.includes('.PanelSection')) {
              return [mod[prop], mod];
          }
      }
      return null;
  });
  const PanelSection = panelSection;
  // New as of Feb 22 2023 Beta || Old
  const PanelSectionRow = mod.PanelSectionRow ||
      Object.values(mod).filter((exp) => !exp?.toString()?.includes('.PanelSection'))[0];

  var SideMenu;
  (function (SideMenu) {
      SideMenu[SideMenu["None"] = 0] = "None";
      SideMenu[SideMenu["Main"] = 1] = "Main";
      SideMenu[SideMenu["QuickAccess"] = 2] = "QuickAccess";
  })(SideMenu || (SideMenu = {}));
  var QuickAccessTab;
  (function (QuickAccessTab) {
      QuickAccessTab[QuickAccessTab["Notifications"] = 0] = "Notifications";
      QuickAccessTab[QuickAccessTab["RemotePlayTogetherControls"] = 1] = "RemotePlayTogetherControls";
      QuickAccessTab[QuickAccessTab["VoiceChat"] = 2] = "VoiceChat";
      QuickAccessTab[QuickAccessTab["Friends"] = 3] = "Friends";
      QuickAccessTab[QuickAccessTab["Settings"] = 4] = "Settings";
      QuickAccessTab[QuickAccessTab["Perf"] = 5] = "Perf";
      QuickAccessTab[QuickAccessTab["Help"] = 6] = "Help";
      QuickAccessTab[QuickAccessTab["Decky"] = 7] = "Decky";
  })(QuickAccessTab || (QuickAccessTab = {}));
  var DisplayStatus;
  (function (DisplayStatus) {
      DisplayStatus[DisplayStatus["Invalid"] = 0] = "Invalid";
      DisplayStatus[DisplayStatus["Launching"] = 1] = "Launching";
      DisplayStatus[DisplayStatus["Uninstalling"] = 2] = "Uninstalling";
      DisplayStatus[DisplayStatus["Installing"] = 3] = "Installing";
      DisplayStatus[DisplayStatus["Running"] = 4] = "Running";
      DisplayStatus[DisplayStatus["Validating"] = 5] = "Validating";
      DisplayStatus[DisplayStatus["Updating"] = 6] = "Updating";
      DisplayStatus[DisplayStatus["Downloading"] = 7] = "Downloading";
      DisplayStatus[DisplayStatus["Synchronizing"] = 8] = "Synchronizing";
      DisplayStatus[DisplayStatus["ReadyToInstall"] = 9] = "ReadyToInstall";
      DisplayStatus[DisplayStatus["ReadyToPreload"] = 10] = "ReadyToPreload";
      DisplayStatus[DisplayStatus["ReadyToLaunch"] = 11] = "ReadyToLaunch";
      DisplayStatus[DisplayStatus["RegionRestricted"] = 12] = "RegionRestricted";
      DisplayStatus[DisplayStatus["PresaleOnly"] = 13] = "PresaleOnly";
      DisplayStatus[DisplayStatus["InvalidPlatform"] = 14] = "InvalidPlatform";
      DisplayStatus[DisplayStatus["PreloadComplete"] = 16] = "PreloadComplete";
      DisplayStatus[DisplayStatus["BorrowerLocked"] = 17] = "BorrowerLocked";
      DisplayStatus[DisplayStatus["UpdatePaused"] = 18] = "UpdatePaused";
      DisplayStatus[DisplayStatus["UpdateQueued"] = 19] = "UpdateQueued";
      DisplayStatus[DisplayStatus["UpdateRequired"] = 20] = "UpdateRequired";
      DisplayStatus[DisplayStatus["UpdateDisabled"] = 21] = "UpdateDisabled";
      DisplayStatus[DisplayStatus["DownloadPaused"] = 22] = "DownloadPaused";
      DisplayStatus[DisplayStatus["DownloadQueued"] = 23] = "DownloadQueued";
      DisplayStatus[DisplayStatus["DownloadRequired"] = 24] = "DownloadRequired";
      DisplayStatus[DisplayStatus["DownloadDisabled"] = 25] = "DownloadDisabled";
      DisplayStatus[DisplayStatus["LicensePending"] = 26] = "LicensePending";
      DisplayStatus[DisplayStatus["LicenseExpired"] = 27] = "LicenseExpired";
      DisplayStatus[DisplayStatus["AvailForFree"] = 28] = "AvailForFree";
      DisplayStatus[DisplayStatus["AvailToBorrow"] = 29] = "AvailToBorrow";
      DisplayStatus[DisplayStatus["AvailGuestPass"] = 30] = "AvailGuestPass";
      DisplayStatus[DisplayStatus["Purchase"] = 31] = "Purchase";
      DisplayStatus[DisplayStatus["Unavailable"] = 32] = "Unavailable";
      DisplayStatus[DisplayStatus["NotLaunchable"] = 33] = "NotLaunchable";
      DisplayStatus[DisplayStatus["CloudError"] = 34] = "CloudError";
      DisplayStatus[DisplayStatus["CloudOutOfDate"] = 35] = "CloudOutOfDate";
      DisplayStatus[DisplayStatus["Terminating"] = 36] = "Terminating";
  })(DisplayStatus || (DisplayStatus = {}));
  const Router = findModuleChild((m) => {
      if (typeof m !== 'object')
          return undefined;
      for (let prop in m) {
          if (m[prop]?.Navigate && m[prop]?.NavigationManager)
              return m[prop];
      }
  });
  let Navigation = {};
  try {
      (async () => {
          let InternalNavigators = {};
          if (!Router.NavigateToAppProperties || Router.deckyShim) {
              function initInternalNavigators() {
                  try {
                      InternalNavigators = findModuleChild((m) => {
                          if (typeof m !== 'object')
                              return undefined;
                          for (let prop in m) {
                              if (m[prop]?.GetNavigator) {
                                  return m[prop];
                              }
                          }
                      })?.GetNavigator();
                  }
                  catch (e) {
                      console.error('[DFL:Router]: Failed to init internal navigators, trying again');
                  }
              }
              initInternalNavigators();
              while (!InternalNavigators?.AppProperties) {
                  console.log('[DFL:Router]: Trying to init internal navigators again');
                  await sleep(100);
                  initInternalNavigators();
              }
          }
          const newNavigation = {
              Navigate: Router.Navigate?.bind(Router),
              NavigateBack: Router.WindowStore?.GamepadUIMainWindowInstance?.NavigateBack?.bind(Router.WindowStore.GamepadUIMainWindowInstance),
              NavigateToAppProperties: InternalNavigators?.AppProperties || Router.NavigateToAppProperties?.bind(Router),
              NavigateToExternalWeb: InternalNavigators?.ExternalWeb || Router.NavigateToExternalWeb?.bind(Router),
              NavigateToInvites: InternalNavigators?.Invites || Router.NavigateToInvites?.bind(Router),
              NavigateToChat: Router.NavigateToChat?.bind(Router),
              NavigateToLibraryTab: InternalNavigators?.LibraryTab || Router.NavigateToLibraryTab?.bind(Router),
              NavigateToLayoutPreview: Router.NavigateToLayoutPreview?.bind(Router),
              NavigateToSteamWeb: Router.WindowStore?.GamepadUIMainWindowInstance?.NavigateToSteamWeb?.bind(Router.WindowStore.GamepadUIMainWindowInstance),
              OpenSideMenu: Router.WindowStore?.GamepadUIMainWindowInstance?.MenuStore.OpenSideMenu?.bind(Router.WindowStore.GamepadUIMainWindowInstance.MenuStore),
              OpenQuickAccessMenu: Router.WindowStore?.GamepadUIMainWindowInstance?.MenuStore.OpenQuickAccessMenu?.bind(Router.WindowStore.GamepadUIMainWindowInstance.MenuStore),
              OpenMainMenu: Router.WindowStore?.GamepadUIMainWindowInstance?.MenuStore.OpenMainMenu?.bind(Router.WindowStore.GamepadUIMainWindowInstance.MenuStore),
              CloseSideMenus: Router.CloseSideMenus?.bind(Router),
              OpenPowerMenu: Router.OpenPowerMenu?.bind(Router),
          };
          Object.assign(Navigation, newNavigation);
      })();
  }
  catch (e) {
      console.error('[DFL:Router]: Error initializing Navigation interface', e);
  }

  const quickAccessMenuClasses = findModule((mod) => typeof mod === 'object' && mod?.Title?.includes('quickaccessmenu'));
  /**
   * @depreciated please use quickAccessMenuClasses instead
   */
  const staticClasses = quickAccessMenuClasses;
  findModule((mod) => typeof mod === 'object' && mod?.ScrollPanel?.includes('scrollpanel'));
  findModule((mod) => typeof mod === 'object' && mod?.GamepadDialogContent?.includes('gamepaddialog'));
  findModule((mod) => typeof mod === 'object' && mod?.PanelSection?.includes('quickaccesscontrols'));
  findModule((mod) => typeof mod === 'object' && mod?.OOBEUpdateStatusContainer?.includes('updaterfield'));
  findModule((mod) => typeof mod === 'object' && mod?.Container?.includes('appdetailsplaysection'));
  findModule((mod) => typeof mod === 'object' && mod?.SliderControlPanelGroup?.includes('gamepadslider'));
  findModule((mod) => typeof mod === 'object' && mod?.TopCapsule?.includes('sharedappdetailsheader'));
  findModule((mod) => typeof mod === 'object' && mod?.HeaderLoaded?.includes('appdetails_'));

  const SteamSpinner = findModuleChild((m) => {
      if (typeof m !== 'object')
          return undefined;
      for (let prop in m) {
          if (m[prop]?.toString?.()?.includes('Steam Spinner') && m[prop]?.toString?.()?.includes('src'))
              return m[prop];
      }
  });

  const Toggle = Object.values(CommonUIModule).find((mod) => mod?.render?.toString()?.includes('.ToggleOff)'));

  // TypeScript helper function
  const definePlugin = (fn) => {
      return (...args) => {
          // TODO: Maybe wrap this
          return fn(...args);
      };
  };

  class Backend {
      static get server() {
          return this._server;
      }
      static initialize(server) {
          this._server = server;
      }
      /**
       * Call backend method.
       *
       * @param name Name of the function
       * @param args Names arguments
       * @returns
       */
      static async callMethod(name, args = {}) {
          const output = await this._server?.callPluginMethod(name, args);
          return output.result;
      }
      /**
       * Show toast with sound.
       *
       * @param title
       * @param message
       * @param sound
       * @param duration
       */
      static async showToast(title, message, sound = 6, duration) {
          Backend.server.toaster.toast({
              title: title,
              sound: sound,
              body: message,
              playSound: true,
              showToast: true,
              duration: duration,
          });
      }
  }

  const slugify = (str) => str.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");

  class GameService {
      get ServiveName() {
          return this._serviceName;
      }
  }

  class EpicGameService extends GameService {
      constructor() {
          super(...arguments);
          this._serviceName = "Epic Games Store";
          this._apiURL = "https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions";
      }
      async _loadData() {
          const fetchResponse = await Backend.server.fetchNoCors(this._apiURL, {
              method: "GET",
              headers: {
                  Accept: "application/json"
              }
          });
          return JSON.parse(fetchResponse.result.body);
      }
      ;
      async loadFreeGames() {
          let response;
          try {
              response = await this._loadData();
          }
          catch (error) {
              Backend.callMethod("log", { message: `Failed to load Epic Games api: ${error}` });
              return [];
          }
          const elements = response?.data?.Catalog?.searchStore?.elements ?? [];
          const now = new Date();
          return elements
              .filter(game => {
              if (!game.promotions?.promotionalOffers || game.promotions?.promotionalOffers.length === 0)
                  return false;
              const currentOffer = game.promotions.promotionalOffers.find(promotion => {
                  return !!promotion.promotionalOffers.find(tmp => {
                      const start = new Date(tmp.startDate);
                      const end = new Date(tmp.endDate);
                      return now >= start && now <= end;
                  });
              });
              if (!currentOffer)
                  return false;
              return true;
          })
              .map(game => {
              const slug = game.catalogNs.mappings.find(mapping => mapping.pageType === "productHome")?.pageSlug ?? "";
              return {
                  name: game.title,
                  page: `https://store.epicgames.com/en-US/p/${slug}`
              };
          }) ?? [];
      }
  }

  class Settings {
      /**
       * Get a settings from the settings file.
       *
       * @param key Name of the setting
       * @param defaultValue Default value to return if setting doesn't exist
       * @returns
       */
      static async getSetting(key, defaultValue) {
          return await Backend.callMethod("getSetting", {
              key: key,
              defaults: defaultValue
          });
      }
      /**
       * Store a value as key in the configuration.
       *
       * @param key Name of the setting
       * @param value Value to store
       */
      static async setSetting(key, value) {
          await Backend.callMethod("setSetting", {
              key: key,
              value: value
          });
      }
  }

  const Service = ({ service }) => {
      const [results, setResults] = React.useState(null);
      const [useNotifications, setNotifications] = React.useState(null);
      const onResults = (games) => setResults(games);
      const onSettings = (results) => Settings.setSetting(slugify(service.ServiveName), results).then(() => setNotifications(results));
      const onSettingsChanges = () => {
          if (useNotifications === null)
              return;
          Settings.setSetting(slugify(service.ServiveName), useNotifications);
      };
      const onMounted = () => {
          service.loadFreeGames()
              .then(onResults)
              .catch(console.error);
          Settings.getSetting(slugify(service.ServiveName), false)
              .then(onSettings)
              .catch(error => Backend.callMethod("log", { message: `Failed to load setting ${error}` }));
      };
      React.useEffect(onMounted, []);
      React.useEffect(onSettingsChanges, [useNotifications]);
      return (window.SP_REACT.createElement(PanelSectionRow, null,
          window.SP_REACT.createElement("h4", null, service.ServiveName),
          useNotifications !== null &&
              window.SP_REACT.createElement("div", { style: { display: "flex", alignItems: "center", gap: "1rem" } },
                  window.SP_REACT.createElement("p", null, "Show notifications for this service:"),
                  window.SP_REACT.createElement(Toggle, { value: useNotifications, onChange: value => setNotifications(value) })),
          results === null && window.SP_REACT.createElement(SteamSpinner, null),
          results?.length === 0 && window.SP_REACT.createElement("p", null, "No games available"),
          !!results?.length &&
              results.length > 0 &&
              results?.map(result => window.SP_REACT.createElement(ButtonItem, { layout: "below", bottomSeparator: "none", onClick: () => Navigation.NavigateToExternalWeb(result.page) }, result.name))));
  };

  const services = [
      new EpicGameService()
  ];
  const sendToast = () => {
      services.forEach(async (service) => {
          const serviceSlug = slugify(service.ServiveName);
          if (!await Settings.getSetting(serviceSlug, false))
              return;
          const games = await service.loadFreeGames();
          games.forEach(async (game) => {
              const gameSlug = `${serviceSlug}-${slugify(game.name)}`;
              // Already sent
              if (await Settings.getSetting(gameSlug, false))
                  return;
              await Settings.setSetting(gameSlug, true);
              Backend.showToast(`New Game available for ${service.ServiveName}`, game.name);
          });
      });
  };
  const Content = () => window.SP_REACT.createElement(PanelSection, null, services.map((service) => window.SP_REACT.createElement(Service, { service: service })));
  var index = definePlugin((serverApi) => {
      Backend.initialize(serverApi);
      sendToast();
      const interval = setInterval(sendToast, 3600000);
      return {
          title: window.SP_REACT.createElement("div", { className: staticClasses.Title }, "Free Game Checker"),
          content: window.SP_REACT.createElement(Content, null),
          icon: window.SP_REACT.createElement(FaMoneyBill, null),
          onDismount() {
              clearInterval(interval);
          }
      };
  });

  return index;

})(SP_REACT);
