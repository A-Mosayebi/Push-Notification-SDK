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

// BrokerConfig Class
// class BrokerConfig {
//     constructor() {
//         this.brokerUsername = null;
//         this.brokerPassword = null;
//         this.securityToken = null;
//         this.otherConfigs = new Map();
//     }
// }

// SecureSession Class
class SecureSession {
    constructor() {
        this.sessionKey = OneSignal.Session;
        this.isSecure = !!OneSignal.Session;
    }

    createSession() {
        this.sessionKey = OneSignal.Session
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
        this.brokerConnection.connect(clientToken)
        this.secureSession= this.identify.createSecureSession();
        
    }

    subscribeTopics(topics, callBackFn) {
        this.subscribe.callBackFn(callBackFn)
        this.subscribe.topicsToSubscribe(topics)
    }

    publishToTopics(topics, message) {

    }

    getConnectedChannel() {
        return this.channel.getChannelID();
    }

    unSubscribeTopics(topics) {
        this.brokerConnection.unsubscribe(topics)
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
    }

    disconnect() {
        OneSignal.logout()
    }

    setClient(clientToken) {
        return clientToken
    }

    subscribe(topics) {
        this.connectionInfo.then((subscribe)=>{
            subscribe(topics)
        })
    }

    publish(topics, message) {
        this.connectionInfo.then((push)=>{
            push(topics,message)
        })
    }

    unsubscribe(topics) {
        this.connectionInfo.then((subscribe)=>{
            subscribe(topics)
        })
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
        this.brokerConnection.subscribe(this.topicsToSubscribe)
    }

    onMessageReceived(message) {
        this.brokerConnection.connectionInfo.then(this.callBackFn)
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
