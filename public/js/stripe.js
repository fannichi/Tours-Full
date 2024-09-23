import axios from 'axios';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51Q1znoIGKEoaMaxiqZmT1U91fcYj9zbaC92Uhwep7KlWSZAKzrNFwzZzmlme79e0x0LAb0jS9xH07v8UEQrAo1ok00vAqXHuiI',
  );
  try {
    // 1 - get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );

    // 2 - create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
