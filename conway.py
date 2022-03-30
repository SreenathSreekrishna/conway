from PIL import Image

def toConway(fname,size):
    img = Image.open(fname)
    lo = img.load()
    grid=[[0 for i in range(size)] for j in range(size)]
    for i in range(img.height):
        for j in range(img.width):
            if all(lo[i,j]):
                grid[i][j] = 1
            else:
                grid[i][j] = 0
    return grid