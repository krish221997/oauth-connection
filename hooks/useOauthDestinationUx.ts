import { useOauthDestination } from "@event-inc/link";
export const useOauthDestinationUx = () => {
  const { open, create } = useOauthDestination({
    clientId: process.env.NEXT_PUBLIC_XERO_CLIENT_ID,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    type: "xero",
    scopes: [
      "accounting.attachments",
      "accounting.contacts",
      "accounting.attachments",
      "payroll.employees",
      "payroll.timesheets",
      "payroll.payruns",
      "accounting.settings",
      "accounting.transactions",
      "files",
      "offline_access",
      "assets",
    ],
    state: "123456",
  });

  return {
    open,
    create,
  };
};
