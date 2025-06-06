export default async function setup() {
    console.log("jest setup: setup completed");
    global.__API_TARGET__ = "https://localhost:8001";
}
