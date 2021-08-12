# automatically generated by the FlatBuffers compiler, do not modify

# namespace: flatbuffers

import flatbuffers

class AnimationInfo(object):
    __slots__ = ['_tab']

    @classmethod
    def GetRootAsAnimationInfo(cls, buf, offset):
        n = flatbuffers.encode.Get(flatbuffers.packer.uoffset, buf, offset)
        x = AnimationInfo()
        x.Init(buf, n + offset)
        return x

    # AnimationInfo
    def Init(self, buf, pos):
        self._tab = flatbuffers.table.Table(buf, pos)

    # AnimationInfo
    def Name(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(4))
        if o != 0:
            return self._tab.String(o + self._tab.Pos)
        return None

    # AnimationInfo
    def StartIndex(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(6))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int32Flags, o + self._tab.Pos)
        return 0

    # AnimationInfo
    def EndIndex(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(8))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int32Flags, o + self._tab.Pos)
        return 0

def AnimationInfoStart(builder): builder.StartObject(3)
def AnimationInfoAddName(builder, name): builder.PrependUOffsetTRelativeSlot(0, flatbuffers.number_types.UOffsetTFlags.py_type(name), 0)
def AnimationInfoAddStartIndex(builder, startIndex): builder.PrependInt32Slot(1, startIndex, 0)
def AnimationInfoAddEndIndex(builder, endIndex): builder.PrependInt32Slot(2, endIndex, 0)
def AnimationInfoEnd(builder): return builder.EndObject()
