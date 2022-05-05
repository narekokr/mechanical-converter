import Spring from './Spring';

export default class SpringArray {
  static readonly OPEN_BRACKET = '[';
  static readonly CLOSE_BRACKET = ']';
  static readonly OPEN_BRACE = '{';
  static readonly CLOSE_BRACE = '}';
  static readonly OPENERS = [this.OPEN_BRACE, this.OPEN_BRACKET];
  static readonly CLOSERS = [this.CLOSE_BRACE, this.CLOSE_BRACKET];

  private static currentIndex: number;
  private static springs: Spring[];
  /**
   * Returns a new spring based on connected springs
   * @param springExpr - expression of balanced braces {} and brackets [].
   * @param springs - the array of springs
   */
  static equivalentSpring(springExpr: string, springs?: Spring[]): Spring {
    const indexes = this.getIndexPairs(springExpr);
    if (springs) {
      this.springs = springs;
    } else {
      this.springs = [];
    }
    this.currentIndex = 0;
    return this.solve(springExpr, indexes);
  }

  /**
   * Returns the staring index and closing index for each spring in the expression
   */
  static getIndexPairs(stringExpression: string): number[][] {
    const indexes = [];
    for (let i = 0; i < stringExpression.length; i++) {
      if (this.OPENERS.includes(stringExpression[i])) {
        indexes.push([i, this.getClosingIndex(stringExpression, i)]);
      }
    }
    return indexes;
  }

  /**
   * Returns the closing index for a given starting index
   */
  static getClosingIndex(stringExpression: string, index: number): number {
    const current = stringExpression[index];
    const opener =
      current === this.OPEN_BRACE ? this.OPEN_BRACE : this.OPEN_BRACKET;
    const closer =
      current === this.OPEN_BRACE ? this.CLOSE_BRACE : this.CLOSE_BRACKET;
    const queue = [current];
    for (let i = index + 1; i < stringExpression.length; i++) {
      if (stringExpression[i] === closer) {
        queue.pop();
      } else if (stringExpression[i] === opener) {
        queue.push(stringExpression[i]);
      }
      if (!queue.length) {
        return i;
      }
    }
    throw new Error('Invalid Spring expression');
  }

  /**
   * Recursive function that can find the equivalent spring from the expression
   * @param stringExpression - the balanced expression
   * @param indexes - array of starting and closing indexes for the springs
   * @param start - the starting index for the current spring
   * @param end - the end index for the current string
   * @private
   */
  private static solve(
    stringExpression: string,
    indexes: number[][],
    start = 0,
    end = stringExpression.length,
  ): Spring {
    if (start === end - 1) {
      if (this.springs.length) {
        return this.springs[this.currentIndex++];
      } else {
        return new Spring();
      }
    }
    const subSprings = [];
    const filteredIndexes = indexes.filter(
      ([startingIndex, endIndex]) => startingIndex > start && endIndex < end,
    );
    const subIndexes = [];
    let i = 0;
    while (i < filteredIndexes.length) {
      const index = filteredIndexes[i];
      subIndexes.push(index);
      i = filteredIndexes.findIndex(
        ([startIndex]) => startIndex === index?.[1] + 1,
      );
      if (i === -1) break;
    }
    for (const [startingIndex, endIndex] of subIndexes) {
      subSprings.push(
        this.solve(stringExpression, indexes, startingIndex, endIndex),
      );
    }
    const spring = subSprings[0];
    if (stringExpression[start] === this.OPEN_BRACE) {
      return subSprings
        .slice(1)
        .reduce((acc, curr) => acc.inSeries(curr), spring);
    } else {
      return subSprings
        .slice(1)
        .reduce((acc, curr) => acc.inParallel(curr), spring);
    }
  }
}
