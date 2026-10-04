export const getGreetingText = () => {
  const now = new Date();
  const hour = now.getHours();

  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return greeting;
};
