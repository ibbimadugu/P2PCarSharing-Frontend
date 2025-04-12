function Home() {
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://augustineugwu.sirv.com/Transaction-Tracking-and-Analytics-Steering-Car-Rental-banner.jpg)",
      }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white px-4 pt-32">
        <h1
          className="text-6xl sm:text-6xl mb-4 mx-24"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}>
          Welcome to the Peer-to-Peer <p> Car Sharing Platform</p>
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Share your car, or find the perfect ride for your next trip.{" "}
          <p>Join the community today!</p>
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="/register"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-2xl text-LG font-semibold transition duration-300">
            JOIN NOW
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
