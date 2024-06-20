import { showErrorMessage } from "../../../components/Toastify";
import { config, CPNetwork, Urls } from "../../../config";

const getReservations = async (id) => {
  const response = await CPNetwork.get(
    Urls.GetReservations + id,
    (
      await config()
    ).headers
  );

  if (!response.ok) {
    showErrorMessage("Failed to load reservations");
    return 0;
  }

  const { reservations } = response.data;
  return reservations;
};

export { getReservations };
