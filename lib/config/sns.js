// this module
const Main = {};

// SNS -------------------------------
Main.sns = {};

// sending limits for SNS
Main.sns.limits = {
  // message_bytes: 256,
  message_bytes: 2000,
  subscriptions: 15,
};

// the exact text AWS uses for pendng and deleted subscriptions
Main.sns.subscriptionMessages = {
  unconfirmed: "PendingConfirmation",
  deleted: "Deleted",
};

// protocols by type
Main.sns.protocols = {
  device: "application",
  user: "email",
};
Main.sns.protocols.admin = Main.sns.protocols.user;

// reserved topic prefixes (these should be excluded from all topic gathering!)
Main.sns.systemTopics = [
  "_system-",
  "_test-",
];

// reserved topic prefixes (people shouldn"t create topics with these prefixes)
Main.sns.reservedTopics = [
  "_app-",
  "_system-",
  "_test-",
];

Main.sns.cats = {
  sportsNow: "_SportsCombo_",
  phillycom: "_PhillyCom_",
};

// variables for SNS
// ios
const iOSPostfix = "_iOS";
const iOSUserAgent = "iOSClient";
// adm
const ADMPostfix = "_ADM";
const ADMUserAgent = "AndroidADMClient";
// gcm
const GCMPostfix = "_GCM";
const GCMUserAgent = "AndroidGCMClient";
// sports now
const sportsNowAppHintPrefix = "AppSportsCombo";
const sportsNowTermHintPrefix = "_app-SportsCombo";
const sportsNowTargetHintPrefix = "sportscombo";
// phillycom
const phillyAppHintPrefix = "AppPhillyCom";
const phillyTermHintPrefix = "_app-PhillyCom";
const phillyTargetHintPrefix = "phillycom";
// inquirercom
const inquirercomUserAgentPrefix = "_InquirerCom_";
const inquirercomAppHintPrefix = "AppInquirerCom";
const inquirercomTermHintPrefix = "_app-InquirerCom";
const inquirercomTargetHintPrefix = "inquirercom";
// baseball
const baseballUserAgentPrefix = "_Baseball_";
const baseballAppHintPrefix = "AppBaseball";
const baseballTermHintPrefix = "_app-Baseball";
const baseballTargetHintPrefix = "baseball";
// basketball (there is no independent basketball app)
const basketballTermHintPrefix = "_app-Basketball";
const basketballTargetHintPrefix = "basketball";
// football
const footballUserAgentPrefix = "_Football_";
const footballAppHintPrefix = "AppFootball";
const footballTermHintPrefix = "_app-Football";
const footballTargetHintPrefix = "football";
// hockey
const hockeyUserAgentPrefix = "_Hockey_";
const hockeyAppHintPrefix = "AppHockey";
const hockeyTermHintPrefix = "_app-Hockey";
const hockeyTargetHintPrefix = "hockey";
// soccer (there is no independent soccer app)
const soccerTermHintPrefix = "_app-Soccer";
const soccerTargetHintPrefix = "soccer";

// construct hints object
Main.sns.hints = [
  // SPORTSNOW
  {
    userAgent: Main.sns.cats.sportsNow + iOSUserAgent,
    appHint: sportsNowAppHintPrefix + iOSPostfix,
    termHint: sportsNowTermHintPrefix + iOSPostfix, // will be provided by the user
    targetHint: sportsNowTargetHintPrefix, // would send to ALL of the sports apps
    // for sports app only
    osPostfix: iOSPostfix,
  },
  {
    userAgent: Main.sns.cats.sportsNow + ADMUserAgent,
    appHint: sportsNowAppHintPrefix + ADMPostfix,
    termHint: sportsNowTermHintPrefix + ADMPostfix, // will be provided by the user
    targetHint: sportsNowTargetHintPrefix, // would send to ALL of the sports apps
    // for sports app only
    osPostfix: ADMPostfix,
  },
  {
    userAgent: Main.sns.cats.sportsNow + GCMUserAgent,
    appHint: sportsNowAppHintPrefix + GCMPostfix,
    termHint: sportsNowTermHintPrefix + GCMPostfix, // will be provided by the user
    targetHint: sportsNowTargetHintPrefix, // would send to ALL of the sports apps
    // for sports app only
    osPostfix: GCMPostfix,
  },
  // PHILLY.COM
  {
    userAgent: Main.sns.cats[phillyTargetHintPrefix] + iOSUserAgent,
    appHint: phillyAppHintPrefix + iOSPostfix,
    termHint: phillyTermHintPrefix + iOSPostfix,
    targetHint: phillyTargetHintPrefix,
  },
  {
    userAgent: Main.sns.cats[phillyTargetHintPrefix] + ADMUserAgent,
    appHint: phillyAppHintPrefix + ADMPostfix,
    termHint: phillyTermHintPrefix + ADMPostfix,
    targetHint: phillyTargetHintPrefix,
  },
  {
    userAgent: Main.sns.cats[phillyTargetHintPrefix] + GCMUserAgent,
    appHint: phillyAppHintPrefix + GCMPostfix,
    termHint: phillyTermHintPrefix + GCMPostfix,
    targetHint: phillyTargetHintPrefix,
  },
  // INQUIRER.COM
  {
    userAgent: inquirercomUserAgentPrefix + iOSUserAgent,
    appHint: inquirercomAppHintPrefix + iOSPostfix,
    termHint: inquirercomTermHintPrefix + iOSPostfix,
    targetHint: inquirercomTargetHintPrefix,
  },
  {
    userAgent: inquirercomUserAgentPrefix + ADMUserAgent,
    appHint: inquirercomAppHintPrefix + ADMPostfix,
    termHint: inquirercomTermHintPrefix + ADMPostfix,
    targetHint: inquirercomTargetHintPrefix,
  },
  {
    userAgent: inquirercomUserAgentPrefix + GCMUserAgent,
    appHint: inquirercomAppHintPrefix + GCMPostfix,
    termHint: inquirercomTermHintPrefix + GCMPostfix,
    targetHint: inquirercomTargetHintPrefix,
  },
  // OLDER SPORTS APPS
  {
    userAgent: baseballUserAgentPrefix + iOSUserAgent,
    appHint: baseballAppHintPrefix + iOSPostfix,
    termHint: baseballTermHintPrefix + iOSPostfix,
    targetHint: baseballTargetHintPrefix,
  },
  {
    userAgent: baseballUserAgentPrefix + ADMUserAgent,
    appHint: baseballAppHintPrefix + ADMPostfix,
    termHint: baseballTermHintPrefix + ADMPostfix,
    targetHint: baseballTargetHintPrefix,
  },
  {
    userAgent: baseballUserAgentPrefix + GCMUserAgent,
    appHint: baseballAppHintPrefix + GCMPostfix,
    termHint: baseballTermHintPrefix + GCMPostfix,
    targetHint: baseballTargetHintPrefix,
  },
  // this only exists in the Sports Combo app
  {
    termHint: basketballTermHintPrefix + ADMPostfix,
    targetHint: basketballTargetHintPrefix,
  },
  {
    termHint: basketballTermHintPrefix + GCMPostfix,
    targetHint: basketballTargetHintPrefix,
  },
  {
    termHint: basketballTermHintPrefix + iOSPostfix,
    targetHint: basketballTargetHintPrefix,
  },
  {
    userAgent: footballUserAgentPrefix + iOSUserAgent,
    appHint: footballAppHintPrefix + iOSPostfix,
    termHint: footballTermHintPrefix + iOSPostfix,
    targetHint: footballTargetHintPrefix,
  },
  {
    userAgent: footballUserAgentPrefix + ADMUserAgent,
    appHint: footballAppHintPrefix + ADMPostfix,
    termHint: footballTermHintPrefix + ADMPostfix,
    targetHint: footballTargetHintPrefix,
  },
  {
    userAgent: footballUserAgentPrefix + GCMUserAgent,
    appHint: footballAppHintPrefix + GCMPostfix,
    termHint: footballTermHintPrefix + GCMPostfix,
    targetHint: footballTargetHintPrefix,
  },
  {
    userAgent: hockeyUserAgentPrefix + iOSUserAgent,
    appHint: hockeyAppHintPrefix + iOSPostfix,
    termHint: hockeyTermHintPrefix + iOSPostfix,
    targetHint: hockeyTargetHintPrefix,
  },
  {
    userAgent: hockeyUserAgentPrefix + ADMUserAgent,
    appHint: hockeyAppHintPrefix + ADMPostfix,
    termHint: hockeyTermHintPrefix + ADMPostfix,
    targetHint: hockeyTargetHintPrefix,
  },
  {
    userAgent: hockeyUserAgentPrefix + GCMUserAgent,
    appHint: hockeyAppHintPrefix + GCMPostfix,
    termHint: hockeyTermHintPrefix + GCMPostfix,
    targetHint: hockeyTargetHintPrefix,
  },
  // this only exists in the Sports Combo app
  {
    termHint: soccerTermHintPrefix + ADMPostfix,
    targetHint: soccerTargetHintPrefix,
  },
  {
    termHint: soccerTermHintPrefix + GCMPostfix,
    targetHint: soccerTargetHintPrefix,
  },
  {
    termHint: soccerTermHintPrefix + iOSPostfix,
    targetHint: soccerTargetHintPrefix,
  },
];


// EXPORT
// =============================================================================
export default Main;
