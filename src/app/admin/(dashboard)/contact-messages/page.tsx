"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  contactInboxMessages,
  type ContactInboxMessage,
} from "@/lib/admin-data";
import { apiRequest } from "@/lib/api";

const LOCAL_STORAGE_KEY = "dpa_contact_messages";

function isMongoId(id: string) {
  return /^[a-f0-9]{24}$/i.test(id);
}

function removeLocalMessage(id: string) {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw) as ContactInboxMessage[];
    const next = parsed.filter((m) => m.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export default function AdminContactMessagesPage() {
  const [items, setItems] = useState<ContactInboxMessage[]>([]);

  useEffect(() => {
    let localItems: ContactInboxMessage[] = [];
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) localItems = JSON.parse(raw) as ContactInboxMessage[];
    } catch {
      localItems = [];
    }

    const mergeUnique = (a: ContactInboxMessage[], b: ContactInboxMessage[]) => {
      const merged = [...a, ...b];
      const seen = new Set<string>();
      return merged.filter((item) => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      });
    };

    const load = async () => {
      try {
        const response = await apiRequest<{
          messages: Array<{
            _id: string;
            name: string;
            email: string;
            phone?: string;
            message: string;
            createdAt: string;
          }>;
        }>("/admin/contacts");

        const apiItems: ContactInboxMessage[] = response.messages.map((msg) => ({
          id: String(msg._id),
          name: msg.name,
          email: msg.email,
          phone: msg.phone,
          message: msg.message,
          date: msg.createdAt,
        }));

        setItems(mergeUnique(apiItems, localItems));
      } catch {
        setItems(mergeUnique(contactInboxMessages, localItems));
      }
    };

    void load();
  }, []);

  const handleDelete = async (item: ContactInboxMessage) => {
    if (!confirm("Delete this contact message permanently?")) return;

    try {
      if (isMongoId(item.id)) {
        await apiRequest(`/admin/contact/${item.id}`, { method: "DELETE" });
      } else {
        removeLocalMessage(item.id);
      }
      setItems((prev) => prev.filter((x) => x.id !== item.id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Contact Inbox</h2>
        <p className="text-sm text-muted">
          Website form submissions (database) and offline submissions stored in this browser only.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-surface-elevated p-4 shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted">
              <th className="px-3 py-2 font-semibold">Name</th>
              <th className="px-3 py-2 font-semibold">Email</th>
              <th className="px-3 py-2 font-semibold">Phone</th>
              <th className="px-3 py-2 font-semibold">Message</th>
              <th className="px-3 py-2 font-semibold">Date</th>
              <th className="px-3 py-2 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-border/70">
                <td className="px-3 py-3 font-medium text-foreground">{item.name}</td>
                <td className="px-3 py-3 text-muted">{item.email}</td>
                <td className="px-3 py-3 text-muted">{item.phone ?? "-"}</td>
                <td className="px-3 py-3 text-muted">{item.message}</td>
                <td className="px-3 py-3 text-muted">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="px-3 py-3">
                  <Button
                    variant="ghost"
                    className="rounded-lg px-3 py-1.5 text-xs text-rose-600 hover:text-rose-700"
                    type="button"
                    onClick={() => void handleDelete(item)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted">No messages.</p>
        ) : null}
      </div>
    </div>
  );
}
