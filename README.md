# Minesweeeper

Minesweeper game project written in JavaScript.

## Testing

This project uses a [Node.js Docker image](https://hub.docker.com/_/node/) and
the test framework [Mocha](https://mochajs.org/).

First, build the Docker image described in the `Dockerfile`:

```bash
docker build . -t minesweeper:latest
```

Once the image is built and properly tagged, run the test with the following
command:

```bash
docker run -t -v $PWD:/app minesweeper mocha
```
