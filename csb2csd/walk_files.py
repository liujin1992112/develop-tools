import os


def walkFile(file):
    for root, dirs, files in os.walk(file):
        for f in files:
            path = os.path.join(root, f)
            if path.endswith('.csb'):
                inPath = path
                outPath = path.replace('.csb', '.csd')

                cmd = 'python convert.py ' + inPath + ' ' + outPath
                os.system(cmd)
                os.remove(inPath)

        for d in dirs:
            "print(os.path.join(root, d))"


def main():
    if len(os.sys.argv) != 2:
        print("usage:\tpython walk_files.py <inDir>")
        exit(0)
    inpath = os.sys.argv[1]
    if os.path.isdir(inpath):
        walkFile(inpath)
    else:
        print("usage:\tpython walk_files.py <inDir>")
        exit(0)


if __name__ == '__main__':
    main()
