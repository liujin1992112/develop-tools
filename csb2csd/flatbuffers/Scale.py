# automatically generated by the FlatBuffers compiler, do not modify

# namespace: flatbuffers

import flatbuffers

class Scale(object):
    __slots__ = ['_tab']

    # Scale
    def Init(self, buf, pos):
        self._tab = flatbuffers.table.Table(buf, pos)

    # Scale
    def ScaleX(self): return self._tab.Get(flatbuffers.number_types.Float32Flags, self._tab.Pos + flatbuffers.number_types.UOffsetTFlags.py_type(0))
    # Scale
    def ScaleY(self): return self._tab.Get(flatbuffers.number_types.Float32Flags, self._tab.Pos + flatbuffers.number_types.UOffsetTFlags.py_type(4))

def CreateScale(builder, scaleX, scaleY):
    builder.Prep(4, 8)
    builder.PrependFloat32(scaleY)
    builder.PrependFloat32(scaleX)
    return builder.Offset()
