import { SERVER_ADDRESS, SESSION_DURATION } from "../constant/server";
import OneSignal from "../onesignalUtils/reactOnesignal";

// Identify Module
class IdentifyModule {
    constructor() {
        this.secureSession = new SecureSession(); 
       
    }
    connectToBroker(clientToken,brokerConnection){
        return brokerConnection.connect(clientToken).then(()=>{
            this.subscribe.subscribeId = OneSignal.User.PushSubscription.id
            this.secureSession.sessionKey = OneSignal.User.PushSubscription.token
        })
    }
    createSecureSession() {
        this.secureSession.createSession()
    }
}



// SecureSession Class
class SecureSession {
    constructor(sessionKey) {
        this.sessionKey = sessionKey;
        this.isSecure = !!sessionKey;
    }

    createSession() {
        this.sessionKey = OneSignal.User.PushSubscription.token
    }

    isSecure() {
        return !!this.sessionKey;
    }

    getSessionKey() {
        return this.sessionKey;
    }

    getSessionDuration() {
        return SESSION_DURATION;
    }
}

// SDK Manager Module
export class SDKManager {
    constructor() {
        this.subscribe = new SubscribeModule();
        this.brokerConnection = new BrokerConnection();
        this.publish = new PublishModule();
        this.identify = new IdentifyModule();
        this.channel = new Channel();
        this.secureSession = new SecureSession();
        this.crypto = new CryptoProcessor();
    }

    init(clientToken) {
        return this.identify.connectToBroker(clientToken,this.brokerConnection)
    }

    subscribeTopics(topics, callBackFn) {
        this.subscribe.subscribeInTopics(topics,callBackFn)
        return this.brokerConnection.subscribe(this.topicsToSubscribe) 
    }

    publishToTopics(topics, message) {

    }

    getConnectedChannel() {
        return this.channel.getChannelID();
    }

    unSubscribeTopics(topics) {
        this.subscribe.unSubscribeTopics(topics)
        return this.brokerConnection.unsubscribe(topics)
    }
}

// CryptoProcessor Class
class CryptoProcessor {
    encrypt(data, key) {
        return data;
    }

    decrypt(encryptedData, key) {
        // Implementation goes here
        return null;
    }
}

// Channel Class
class Channel {
    constructor(id,info) {
        this.channelID = id;
        this.channelInfo = info;
    }

    getChannelID() {   
        return this.channelID;
    }

    getChannelInfo() {
        return this.channelInfo;
    }

    setChannel(channelID, channelInfo) {
        // Implementation goes here
        return
    }
}

// BrokerConnection Class
class BrokerConnection {
     
    constructor() {
        this.serverAddress = SERVER_ADDRESS;
        this.connectionInfo = null;
    }

    connect(configs) {
        this.connectionInfo= OneSignal.init({appId:configs})
        return this.connectionInfo
    }

    disconnect() {
        OneSignal.logout()
    }

    setClient(clientToken) {
        return clientToken
    }

    subscribe(topics) {
        return OneSignal.User.PushSubscription.optIn()
    }

    publish(topics, message) {
        this.connectionInfo.then((push)=>{
            push(topics,message)
        })
    }

    unsubscribe(topics) {
        //OneSignal is Singel Topic
        return OneSignal.User.PushSubscription.optOut()
    }
}

// Subscribe Module
class SubscribeModule {
    constructor(callBackFn,topicsToSubscribe,topicsToUnsubscribe,subscribeId) {
        this.callBackFn = callBackFn;
        this.topicsToSubscribe = topicsToSubscribe;
        this.topicsToUnsubscribe = topicsToUnsubscribe;
        this.subscribeId = subscribeId;
    }

    subscribeInTopics(topicsToSubscribe,callBackFn) {
        this.callBackFn = callBackFn
        this.topicsToSubscribe = topicsToSubscribe
    }

    onMessageReceived(message) {
        OneSignal.User.PushSubscription.addEventListener(this.callBackFn(message))
    }

    getSubscribeId() {
        return this.subscribeId;
    }

    unSubscribeTopics(topicsToUnsubscribe) {
        this.topicsToUnsubscribe = topicsToUnsubscribe
    }
}

// PublishModule Class
class PublishModule {
    constructor(topicsToPublish) {
        this.topicsToPublish=topicsToPublish
        this.brokerConnection = null;
        this.secureSession = null;
    }

    connectToBroker(config, serverAddress, clientToken) {
        // Implementation goes here
        return null;
    }

    createSecureSession() {
        // Implementation goes here
        return null;
    }

    publishToTopics(topics, message) {
        // Implementation goes here
    }
}
