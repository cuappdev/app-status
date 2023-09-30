import { Subscriber, SubscriberModel } from "./models";

const getSubscribers = () => SubscriberModel.find();

const getSubscriberByEmail = (email: string) =>
  SubscriberModel.findOne({ email: email });

const createSubscriber = (email: string) =>
  SubscriberModel.create(new Subscriber(email));

const subscribeToApp = async (email: string, appName: string) => {
  const subscriber = await getSubscriberByEmail(email);
  if (subscriber) {
    if (new Set(subscriber.subscribedApps).has(appName)) {
      throw Error("User already subscribed to app");
    }

    subscriber.subscribedApps.push(appName);
    await subscriber.save();
  } else {
    const newSubscriber = await createSubscriber(email);
    newSubscriber.subscribedApps.push(appName);
    await newSubscriber.save();
  }
};

export default {
  getSubscribers,
  getSubscriberByEmail,
  createSubscriber,
  subscribeToApp,
};
