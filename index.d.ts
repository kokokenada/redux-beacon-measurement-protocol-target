export function GoogleAnalyticsMeasurementProtocol(events: any[]): void;
export function setConfig(config: IMeasurementProtocolConfig): void;
export function XhrPost(data: IMeasurementProtocolPost): void;

export interface IMeasurementProtocolPost {
  url: string;
}

export interface IMeasurementProtocolConfig {
  trackingId: string;
  clientId: string;
  userAgent: string;
  userId?: string;
  callback(pos: IMeasurementProtocolPost) : void;
}
