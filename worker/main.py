import time


def main():
    while True:
        print("worker: tick")
        time.sleep(6 * 60 * 60)


if __name__ == "__main__":
    main()
