import { useOauth } from "@event-inc/link";

export const useEventOauth = () => {
  const { open, create } = useOauth({
    type: "xero",
    //TODO: Rename this to XERO_CLIENT_ID
    clientId: process.env.NEXT_PUBLIC_XERO_CLIENT_ID,
    //TODO: Rename this to REDIRECT_URI
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
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
      "offline_access", // required
      "assets",
    ],
    // The state parameter should be used to avoid forgery attacks. 
    // Pass in a value that's unique to the user you're sending through authorisation.
    // It will be passed back after the user completes authorisation.
    state: "application-meaningful-id", 
  });

  return {
    open,
    create,
  };
};