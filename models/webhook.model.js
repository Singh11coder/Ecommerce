
import mongoose from "mongoose";

const webhookEventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
    },

    eventType: {
      type: String,
      required: true,
    },

    payload: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "received",
        "processing",
        "processed",
        "failed",
      ],
      default: "received",
    },

    attempts: {
      type: Number,
      default: 0,
    },

    processedAt: {
      type: Date,
      default: null,
    },

    error: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const WebhookEvent = mongoose.model(
  "webhookEvent",
  webhookEventSchema
);

export default WebhookEvent;
