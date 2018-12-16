import { Sdp } from '../utils/protocols/sdp'

export interface GenericMessage {
  readonly type: MessageType
  readonly data: Buffer
  ntpTimestamp?: number
}

export enum MessageType {
  UNKNOWN = 0,
  RAW,
  RTP,
  RTCP,
  RTSP,
  SDP,
  ELEMENTARY,
  ISOM,
  XML,
  JPEG,
}

export interface RawMessage extends GenericMessage {
  readonly type: MessageType.RAW
}

export interface RtpMessage extends GenericMessage {
  readonly type: MessageType.RTP
  readonly channel: number
}

export interface RtcpMessage extends GenericMessage {
  readonly type: MessageType.RTCP
  readonly channel: number
}

export interface RtspMessage extends GenericMessage {
  readonly type: MessageType.RTSP
  readonly method?: string
  readonly headers?: { [key: string]: string }
  readonly uri?: string
  readonly protocol?: string
}

export interface SdpMessage extends GenericMessage {
  readonly type: MessageType.SDP
  readonly sdp: Sdp
}

export interface ElementaryMessage extends GenericMessage {
  readonly type: MessageType.ELEMENTARY
  readonly payloadType: number
  readonly timestamp: number
}

export interface IsomMessage extends GenericMessage {
  readonly type: MessageType.ISOM
}

export interface XmlMessage extends GenericMessage {
  readonly type: MessageType.XML
  readonly timestamp: number
  readonly payloadType: number
}

export interface JpegMessage extends GenericMessage {
  readonly type: MessageType.JPEG
  readonly timestamp: number
  readonly payloadType: number
  readonly framesize: {
    readonly width: number
    readonly height: number
  }
}

export type Message =
  | RawMessage
  | RtpMessage
  | RtcpMessage
  | RtspMessage
  | SdpMessage
  | ElementaryMessage
  | IsomMessage
  | XmlMessage
  | JpegMessage

export type MessageHandler = (msg: GenericMessage) => void
