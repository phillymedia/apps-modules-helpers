"use strict";var Main={};Main.sns={},Main.sns.limits={message_bytes:2e3,subscriptions:15},Main.sns.subscriptionMessages={unconfirmed:"PendingConfirmation",deleted:"Deleted"},Main.sns.protocols={device:"application",user:"email"},Main.sns.protocols.admin=Main.sns.protocols.user,Main.sns.systemTopics=["_system-","_test-"],Main.sns.reservedTopics=["_app-","_system-","_test-"],Main.sns.cats={sportsNow:"_SportsCombo_",phillycom:"_PhillyCom_"};var iOSPostfix="_iOS",iOSUserAgent="iOSClient",ADMPostfix="_ADM",ADMUserAgent="AndroidADMClient",GCMPostfix="_GCM",GCMUserAgent="AndroidGCMClient",sportsNowAppHintPrefix="AppSportsCombo",sportsNowTermHintPrefix="_app-SportsCombo",sportsNowTargetHintPrefix="sportscombo",phillyAppHintPrefix="AppPhillyCom",phillyTermHintPrefix="_app-PhillyCom",phillyTargetHintPrefix="phillycom",inquirercomUserAgentPrefix="_InquirerCom_",inquirercomAppHintPrefix="AppInquirerCom",inquirercomTermHintPrefix="_app-InquirerCom",inquirercomTargetHintPrefix="inquirercom",baseballUserAgentPrefix="_Baseball_",baseballAppHintPrefix="AppBaseball",baseballTermHintPrefix="_app-Baseball",baseballTargetHintPrefix="baseball",basketballTermHintPrefix="_app-Basketball",basketballTargetHintPrefix="basketball",footballUserAgentPrefix="_Football_",footballAppHintPrefix="AppFootball",footballTermHintPrefix="_app-Football",footballTargetHintPrefix="football",hockeyUserAgentPrefix="_Hockey_",hockeyAppHintPrefix="AppHockey",hockeyTermHintPrefix="_app-Hockey",hockeyTargetHintPrefix="hockey",soccerTermHintPrefix="_app-Soccer",soccerTargetHintPrefix="soccer";Main.sns.hints=[{userAgent:Main.sns.cats.sportsNow+iOSUserAgent,appHint:sportsNowAppHintPrefix+iOSPostfix,termHint:sportsNowTermHintPrefix+iOSPostfix,targetHint:sportsNowTargetHintPrefix,osPostfix:iOSPostfix},{userAgent:Main.sns.cats.sportsNow+ADMUserAgent,appHint:sportsNowAppHintPrefix+ADMPostfix,termHint:sportsNowTermHintPrefix+ADMPostfix,targetHint:sportsNowTargetHintPrefix,osPostfix:ADMPostfix},{userAgent:Main.sns.cats.sportsNow+GCMUserAgent,appHint:sportsNowAppHintPrefix+GCMPostfix,termHint:sportsNowTermHintPrefix+GCMPostfix,targetHint:sportsNowTargetHintPrefix,osPostfix:GCMPostfix},{userAgent:Main.sns.cats[phillyTargetHintPrefix]+iOSUserAgent,appHint:phillyAppHintPrefix+iOSPostfix,termHint:phillyTermHintPrefix+iOSPostfix,targetHint:phillyTargetHintPrefix},{userAgent:Main.sns.cats[phillyTargetHintPrefix]+ADMUserAgent,appHint:phillyAppHintPrefix+ADMPostfix,termHint:phillyTermHintPrefix+ADMPostfix,targetHint:phillyTargetHintPrefix},{userAgent:Main.sns.cats[phillyTargetHintPrefix]+GCMUserAgent,appHint:phillyAppHintPrefix+GCMPostfix,termHint:phillyTermHintPrefix+GCMPostfix,targetHint:phillyTargetHintPrefix},{userAgent:inquirercomUserAgentPrefix+iOSUserAgent,appHint:inquirercomAppHintPrefix+iOSPostfix,termHint:inquirercomTermHintPrefix+iOSPostfix,targetHint:inquirercomTargetHintPrefix},{userAgent:inquirercomUserAgentPrefix+ADMUserAgent,appHint:inquirercomAppHintPrefix+ADMPostfix,termHint:inquirercomTermHintPrefix+ADMPostfix,targetHint:inquirercomTargetHintPrefix},{userAgent:inquirercomUserAgentPrefix+GCMUserAgent,appHint:inquirercomAppHintPrefix+GCMPostfix,termHint:inquirercomTermHintPrefix+GCMPostfix,targetHint:inquirercomTargetHintPrefix},{userAgent:baseballUserAgentPrefix+iOSUserAgent,appHint:baseballAppHintPrefix+iOSPostfix,termHint:baseballTermHintPrefix+iOSPostfix,targetHint:baseballTargetHintPrefix},{userAgent:baseballUserAgentPrefix+ADMUserAgent,appHint:baseballAppHintPrefix+ADMPostfix,termHint:baseballTermHintPrefix+ADMPostfix,targetHint:baseballTargetHintPrefix},{userAgent:baseballUserAgentPrefix+GCMUserAgent,appHint:baseballAppHintPrefix+GCMPostfix,termHint:baseballTermHintPrefix+GCMPostfix,targetHint:baseballTargetHintPrefix},{termHint:basketballTermHintPrefix+ADMPostfix,targetHint:basketballTargetHintPrefix},{termHint:basketballTermHintPrefix+GCMPostfix,targetHint:basketballTargetHintPrefix},{termHint:basketballTermHintPrefix+iOSPostfix,targetHint:basketballTargetHintPrefix},{userAgent:footballUserAgentPrefix+iOSUserAgent,appHint:footballAppHintPrefix+iOSPostfix,termHint:footballTermHintPrefix+iOSPostfix,targetHint:footballTargetHintPrefix},{userAgent:footballUserAgentPrefix+ADMUserAgent,appHint:footballAppHintPrefix+ADMPostfix,termHint:footballTermHintPrefix+ADMPostfix,targetHint:footballTargetHintPrefix},{userAgent:footballUserAgentPrefix+GCMUserAgent,appHint:footballAppHintPrefix+GCMPostfix,termHint:footballTermHintPrefix+GCMPostfix,targetHint:footballTargetHintPrefix},{userAgent:hockeyUserAgentPrefix+iOSUserAgent,appHint:hockeyAppHintPrefix+iOSPostfix,termHint:hockeyTermHintPrefix+iOSPostfix,targetHint:hockeyTargetHintPrefix},{userAgent:hockeyUserAgentPrefix+ADMUserAgent,appHint:hockeyAppHintPrefix+ADMPostfix,termHint:hockeyTermHintPrefix+ADMPostfix,targetHint:hockeyTargetHintPrefix},{userAgent:hockeyUserAgentPrefix+GCMUserAgent,appHint:hockeyAppHintPrefix+GCMPostfix,termHint:hockeyTermHintPrefix+GCMPostfix,targetHint:hockeyTargetHintPrefix},{termHint:soccerTermHintPrefix+ADMPostfix,targetHint:soccerTargetHintPrefix},{termHint:soccerTermHintPrefix+GCMPostfix,targetHint:soccerTargetHintPrefix},{termHint:soccerTermHintPrefix+iOSPostfix,targetHint:soccerTargetHintPrefix}],module.exports=Main;