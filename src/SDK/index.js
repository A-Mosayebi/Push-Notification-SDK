import { SERVER_ADDRESS } from "../constant/server";
import OneSignal from "../onesignalUtils/reactOnesignal";

// Identify Module
class IdentifyModule {
    constructor() {
        this.brokerConnection = new BrokerConnection();
        this.secureSession = new SecureSession();
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

        return 0;
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
        return this.brokerConnection.connect(clientToken).then(()=>{
            this.subscribe.subscribeId = OneSignal.User.PushSubscription.id
            console.log(OneSignal.Session)
            this.secureSession.sessionKey = OneSignal.User.PushSubscription.token
        })
    }

    subscribeTopics(topics, callBackFn) {
        this.subscribe.callBackFn = callBackFn
        this.subscribe.topicsToSubscribe = topics
        return this.subscribe.subscribeInTopics()
    }

    publishToTopics(topics, message) {

    }

    getConnectedChannel() {
        return this.channel.getChannelID();
    }

    unSubscribeTopics(topics) {
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
        this.brokerConnection = new BrokerConnection()
    }

    subscribeInTopics() {
        return this.brokerConnection.subscribe(this.topicsToSubscribe)
    }

    onMessageReceived(message) {
        OneSignal.User.PushSubscription.addEventListener(this.callBackFn(message))
    }

    getSubscribeId() {
        return this.subscribeId;
    }

    unSubscribeTopics() {
        this.brokerConnection.unsubscribe(this.topicsToUnsubscribe)
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
// BrokerConfig Class
class BrokerConfig {
    constructor() {
        this.brokerUsername = null;
        this.brokerPassword = null;
        this.securityToken = null;
        this.otherConfigs = new Map();
    }
}