import { prisma } from "./db";

export async function notifyUser(userId: string, title: string, body: string) {
  try {
    await prisma.notification.create({ data: { userId, title, body } });
  } catch (e) {
    console.error("notify failed", e);
  }
}
