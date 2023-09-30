import { getModelForClass, prop } from "@typegoose/typegoose";

class Subscriber {
  @prop()
  email: string;

  @prop()
  subscribedApps: string[];

  constructor(email: string) {
    this.email = email;
    this.subscribedApps = [];
  }
}

const SubscriberModel = getModelForClass(Subscriber);

export { Subscriber, SubscriberModel };
