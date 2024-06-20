import { CPNetwork, Urls, config } from "../../../config";
import { showErrorMessage } from "../../../components/Toastify";

const getAllBEO = async (date) => {
  const response = await CPNetwork.get(
    Urls.GetEventByDate + date,
    await (
      await config()
    ).headers
  );

  if (!response.ok) {
    showErrorMessage("Failed to get the events");
    return 0;
  }

  const { events } = response.data;
  return events;
};

const searchEvents = async (text) => {
  if (!text) return;
  const response = await CPNetwork.post(
    Urls.EventSearch + text,
    {},
    (
      await config()
    ).headers
  );
  if (!response.ok) {
    showErrorMessage("Failed to search");
    return 0;
  }

  const { events } = response.data;
  return events;
};

export { getAllBEO, searchEvents };
