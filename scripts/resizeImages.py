# -*- coding: utf-8 -*-
"""
Created on Fri Nov 13 11:51:49 2015

@author: pabloem
"""

import os
from PIL import Image


def filePaths(rootdir, key):
    """ Returns a list with the paths of all the files that starts with the
    sting key.
    rootdir: init directory to start the search recursively.
    key: string used to filter the search.
    """
    filepaths = []
    for i in os.walk(rootdir):
        dirpath, dirnames, filenames = i
        if filenames:
            for name in filenames:
                if name[0:5] == key:
                    filepaths.append(os.path.join(dirpath, name))
    return filepaths


imagePaths = filePaths('../data', 'photo')
for imagePath in imagePaths:
    img = Image.open(imagePath)
    print(img.format, img.size, img.mode)
    originalSize = imagePath + 'Original'
    img.save(originalSize, 'JPEG')

    size = (img.size[0]/2, img.size[1]/2)
    imgNew = img.resize(size)
    imgNew.save(imagePath, 'JPEG')
