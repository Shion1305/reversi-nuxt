import { Disc } from '~/server/model/disc'

export enum DiscRole {
  BLACK = 1,
  WHITE = 2
}

export namespace DiscRole {
  export function getOpponentDisc(disc: DiscRole): DiscRole {
    return disc === DiscRole.BLACK ? DiscRole.WHITE : DiscRole.BLACK
  }

  export function getDisc(disc: DiscRole): Disc {
    return disc === DiscRole.BLACK ? Disc.BLACK : Disc.WHITE
  }
}
